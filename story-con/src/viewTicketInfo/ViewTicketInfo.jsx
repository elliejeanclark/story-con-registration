import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './ViewTicketInfo.css';

const ViewTicketInfo = () => {
  const [tickets, setTickets] = useState([]);
  const [visibility, setVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchType, setSearchType] = useState('');

  const ticketsPerPage = 10;

  useEffect(() => {
    async function fetchTicketsWithAddOns() {
      setIsLoading(true);

      const { data: tickets, error: ticketsError } = await supabase.from('ticket').select('*');
      if (ticketsError) {
        console.error('Error fetching tickets:', ticketsError);
        setIsLoading(false);
        return;
      }

      const { data: addOnLinks, error: linkError } = await supabase.from('ticket_addOns').select('*');
      if (linkError) {
        console.error('Error fetching add-on links:', linkError);
        setIsLoading(false);
        return;
      }

      const { data: addOns, error: addOnsError } = await supabase.from('addOns').select('*');
      if (addOnsError) {
        console.error('Error fetching add-ons:', addOnsError);
        setIsLoading(false);
        return;
      }

      const addOnLookup = new Map();
      for (const addOn of addOns) {
        addOnLookup.set(String(addOn.addOnID), addOn);
      }

      const addOnMap = {};
      for (const link of addOnLinks) {
        const ticketID = String(link.ticketID);
        const addOnID = String(link.addOnID);

        const matchingAddOn = addOnLookup.get(addOnID);
        if (matchingAddOn) {
          if (!addOnMap[ticketID]) {
            addOnMap[ticketID] = [];
          }
          addOnMap[ticketID].push(matchingAddOn);
        }
      }

      const ticketsWithAddOns = tickets.map(ticket => ({
        ...ticket,
        addOns: addOnMap[String(ticket.ticketID)] || [],
      }));

      setTickets(ticketsWithAddOns);
      setIsLoading(false);
    }

    fetchTicketsWithAddOns();
  }, []);

  const toggleVisibility = (ticketID) => {
    setVisibility((prevState) => ({
      ...prevState,
      [ticketID]: !prevState[ticketID],
    }));
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.nameUnder.toLowerCase().includes(searchName.toLowerCase()) &&
    ticket.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
    ticket.ticketType.toLowerCase().includes(searchType.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ticketsPerPage;
  const endIndex = currentPage * ticketsPerPage;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage * ticketsPerPage < filteredTickets.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="body">
      <div className="p-6">
        <p id="heading">Registered Tickets</p>

        <div id="searchFields" className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border rounded px-3 py-1"
          />
          <input
            type="text"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="border rounded px-3 py-1"
          />
          <input
            type="text"
            placeholder="Search by ticket type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border rounded px-3 py-1"
          />
        </div>

        {isLoading ? (
          <div>Loading tickets...</div>
        ) : (
          <div className="overflow-x-auto">
            <table id="ticketsTable" className="min-w-full border border-gray-300 rounded-xl shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Date Purchased</th>
                  <th className="p-3 text-left">Cost</th>
                  <th className="p-3 text-left">Add-ons</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTickets.map((ticket) => (
                  <tr key={ticket.ticketID} className="border-t border-gray-200">
                    <td className="p-3">{ticket.nameUnder}</td>
                    <td className="p-3">{ticket.email}</td>
                    <td className="p-3">{ticket.ticketType}</td>
                    <td className="p-3">{new Date(ticket.datePurchased).toLocaleDateString()}</td>
                    <td className="p-3">${ticket.cost.toFixed(2)}</td>
                    <td className="p-3">
                      <button
                        id="toggleAddOnsButton"
                        onClick={() => toggleVisibility(ticket.ticketID)}
                        className="text-blue-500 hover:underline"
                      >
                        {visibility[ticket.ticketID] ? 'Hide AddOns' : 'Show AddOns'}
                      </button>
                      {visibility[ticket.ticketID] && (
                        <div>
                          {ticket.addOns.length === 0 ? (
                            <span className="text-gray-400 italic">No add-ons available</span>
                          ) : (
                            ticket.addOns.map((addOn, idx) => (
                              <div key={idx} className="mb-3">
                                <div className="font-medium">
                                  {addOn.type} — ${addOn.cost.toFixed(2)}
                                </div>
                                {addOn.information && (
                                  <div className="text-sm text-gray-600 pl-2 mt-2">
                                    {typeof addOn.information === 'object' ? (
                                      Object.entries(addOn.information).map(([key, value], index) => (
                                        <div id="addOnInfo" key={index}>
                                          <strong>{key}:</strong> {value}
                                        </div>
                                      ))
                                    ) : (
                                      <pre className="whitespace-pre-wrap">
                                        {JSON.stringify(JSON.parse(addOn.information), null, 2)}
                                      </pre>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-400">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Info */}
            <div id="pageNumDisplay" className="mt-2">
              Showing page {currentPage} of {Math.ceil(filteredTickets.length / ticketsPerPage)}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between mt-4" id="pageButtons">
              <button
                id="pageButton"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Previous
              </button>
              <button
                id="pageButton"
                onClick={handleNextPage}
                disabled={currentPage * ticketsPerPage >= filteredTickets.length}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTicketInfo;

