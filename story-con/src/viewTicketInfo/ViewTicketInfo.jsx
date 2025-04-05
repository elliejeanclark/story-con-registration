import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './ViewTicketInfo.css';

const ViewTicketInfo = () => {
  const [tickets, setTickets] = useState([]);
  const [visibility, setVisibility] = useState({});

  useEffect(() => {
    async function fetchTicketsWithAddOns() {
      const { data: tickets, error: ticketsError } = await supabase.from('ticket').select('*');
      if (ticketsError) {
        console.error('Error fetching tickets:', ticketsError);
        return;
      }

      const { data: addOnLinks, error: linkError } = await supabase.from('ticket_addOns').select('*');
      if (linkError) {
        console.error('Error fetching add-on links:', linkError);
        return;
      }

      const { data: addOns, error: addOnsError } = await supabase.from('addOns').select('*');
      if (addOnsError) {
        console.error('Error fetching add-ons:', addOnsError);
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
    }

    fetchTicketsWithAddOns();
  }, []);

  const toggleVisibility = (ticketID) => {
    setVisibility((prevState) => ({
        ...prevState,
        [ticketID]: !prevState[ticketID],
    }));
  };

return (
    <div className="body">
        <div className="p-6">
            <p id="heading">Registered Tickets</p>
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
                        {tickets.map((ticket) => (
                            <tr key={ticket.ticketID} className="border-t border-gray-200">
                                <td className="p-3">{ticket.nameUnder}</td>
                                <td className="p-3">{ticket.email}</td>
                                <td className="p-3">{ticket.ticketType}</td>
                                <td className="p-3">{new Date(ticket.datePurchased).toLocaleDateString()}</td>
                                <td className="p-3">${ticket.cost.toFixed(2)}</td>
                                <div id="addOnWrapper">
                                    <button
                                        id="toggleAddOnsButton"
                                        onClick={() => toggleVisibility(ticket.ticketID)} // Toggle the state for showing add-ons
                                    >
                                        {visibility[ticket.ticketID] ? 'Hide AddOns' : 'Show AddOns'}
                                    </button>
                                    {visibility[ticket.ticketID] && (
                                        <td className="p-3">
                                        {ticket.addOns.map((addOn, idx) => (
                                            <div key={idx} className="mb-3">
                                            <div className="font-medium">
                                                {addOn.type} — ${addOn.cost.toFixed(2)}
                                            </div>
                                            {addOn.information && (
                                                <div className="text-sm text-gray-600 pl-2 mt-2">
                                                {typeof addOn.information === 'object' ? (
                                                    // If it's an object, map over its entries and display them
                                                    <div>
                                                    {Object.entries(addOn.information).map(([key, value], i) => (
                                                        <div key={i} className="mb-2">
                                                        <strong>{key}:</strong> {typeof value === 'object' ? (
                                                            // If the value is an object itself, stringify it for display
                                                            <pre className="whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>
                                                        ) : (
                                                            value
                                                        )}
                                                        </div>
                                                    ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic">Information is not an object</span>
                                                )}
                                                </div>
                                            )}
                                            </div>
                                        ))}

                                        </td>
                                    )}
                                </div>
                            </tr>
                        ))}
                        {tickets.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-400">
                                    No tickets found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};

export default ViewTicketInfo;