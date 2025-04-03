import React, {useEffect, useState} from 'react';
import { supabase } from '../lib/supabaseClient';

const ViewTicketInfo = () => {
    const [tickets, setTickets] = useState([]);


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

            const addOnMap = {};

            for (let link of addOnLinks) {
                if (!addOnMap[link.ticketID]) {
                    addOnMap[link.ticketID] = [];
                }

                const matchingAddOn = addOns.find(a => a.id === link.addOnID);
                if (matchingAddOn) {
                    addOnMap[link.ticketID].push(matchingAddOn);
                }
            }

            const ticketsWithAddOns = tickets.map(ticket => ({
                ...ticket,
                addOns: addOnMap[ticket.id] || []
            }));

            setTickets(ticketsWithAddOns);
        }

        fetchTicketsWithAddOns();
    }, []);

    return (
        <div className="body">
            <h1 className="text-2xl font-bold">Ticket Info</h1>
            <pre>{JSON.stringify(tickets, null, 2)}</pre> {/* Just for testing */}
        </div>
    );
};

export default ViewTicketInfo;