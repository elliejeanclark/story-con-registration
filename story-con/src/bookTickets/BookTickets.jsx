import React, {useState} from 'react';
import './BookTickets.css';

function BookTicketsPage() {
    const [showGalaGuestInfo, setShowGalaGuestInfo] = useState(false);
    const [galaGuests, setGalaGuests] = useState([{id: 1, name: '', email: ''}]);
    const [showMasterclassInfo, setShowMasterclassInfo] = useState(false);
    const [masterclasses, setMasterclasses] = useState([{id: 1, className: ''}]);

    const addGuest = () => {
        setGalaGuests([...galaGuests, {id: galaGuests.length + 1, name: '', email: ''}]);
    };

    const addMasterclass = () => {
        setMasterclasses([...masterclasses, {id: masterclasses.length + 1, className: ''}]);
    };

    const removeGuest = (id) => {
        setGalaGuests(galaGuests.filter(guest => guest.id !== id));
    };

    const removeMasterclass = (id) => {
        setMasterclasses(masterclasses.filter(masterclass => masterclass.id !== id));
    };

    const handleGuestChange = (index, field, value) => {
        const updatedGuests = [...galaGuests];
        updatedGuests[index][field] = value;
        setGalaGuests(updatedGuests);
    };

    const handleMasterclassChange = (index, field, value) => {
        const updatedMasterclasses = [...masterclasses];
        updatedMasterclasses[index][field] = value;
        setMasterclasses(updatedMasterclasses);
    };

    return (
        <div className="body">
            <h1 className="page-title">Get Tickets Here!</h1>
            <form id="ticket-form">
                <div id="basic-info">
                    <div className="form-group">
                        <label htmlFor="name">Name Ticket will be Under</label>
                        <input type="text" className="form-control" id="name" placeholder='Name Here'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder='Email Here'/>
                    </div>
                </div>
                <div id="ticket-type">
                    <div>
                        <label htmlFor="ticket-type">Ticket Type</label>
                        <select className="form-control" id="ticket-type">
                            <option value="tweenAuthorPassMorning">Tween Author Pass Morning Session</option>
                            <option value="tweenAuthorPassAfternoon">Tween Author Pass Afternoon Session</option>
                            <option value="teenAuthorPass">Teen Author Pass</option>
                            <option value="educatorPass">Educator Pass</option>
                            <option value="generalAdmission">General Admission</option>
                            <option value="freeTeacherChaperonePass">Free Teacher Chaperone Pass</option>
                            <option value="influencerPass">Influencer Pass</option>
                            <option value="bookstoreLibrarianPass">Bookstore or Librarian Pass</option>
                            <option value="exhibitHall">Exhibit Hall</option>
                        </select>
                    </div>
                </div>
                <p id="add-on-header">Add Ons:</p>
                <p id="add-on-info">Learn more</p>
                <div id="add-ons">
                    <div id="first-five-addons">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="generalAdmissionGala"/>
                            <label className="form-check-label" htmlFor="generalAdmissionGala">Gala General Admission</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="vipPlusGala"/>
                            <label className="form-check-label" htmlFor="vipPlusGala">VIP Plus Gala Admission</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="generalAdmissionGalaGuest" 
                                onChange={(e) => {
                                    setShowGalaGuestInfo(e.target.checked);
                                    if (!e.target.checked) {
                                        setGalaGuests([]);
                                    }
                                }
                            }/>
                            <label className="form-check-label" htmlFor="generalAdmissionGalaGuest">General Admission Gala Guest</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="allAccessMasterclass"/>
                            <label className="form-check-label" htmlFor="allAccessMasterClass">All Access Masterclass Pass</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="masterclass"
                                onChange={(e) => {
                                    setShowMasterclassInfo(e.target.checked);
                                    if (!e.target.checked) {
                                        setMasterclasses([]);
                                    }
                                }
                            }/>
                            <label className="form-check-label" htmlFor="masterclass">Masterclass</label>
                        </div>
                    </div>
                    <div id="second-five-addons">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="agentEditorPitchSession"/>
                            <label className="form-check-label" htmlFor="agentEditorPitchSession">Agent/Editor Pitch Session</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="tShirt"/>
                            <label className="form-check-label" htmlFor="tShirt">Story Con T-Shirt</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="leatherNotebook"/>
                            <label className="form-check-label" htmlFor="leatherNotebook">Commemerative Leather Notebook</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="bookVoucher"/>
                            <label className="form-check-label" htmlFor="bookVoucher">Book Voucher</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="educatorBreakfast"/>
                            <label className="form-check-label" htmlFor="educatorBreakfast">Educator Breakfast</label>
                        </div>
                    </div>
                </div>

                {showMasterclassInfo && (
                    <div id="masterclass-info">
                        {masterclasses.map((masterclass, index) => (
                            <div key={masterclass.id} className="masterclass-row">
                                <div className="form-group">
                                    <label htmlFor={`masterclass-name-${masterclass.id}`}>Masterclass Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`masterclass-name-${masterclass.id}`}
                                        placeholder="Masterclass Name Here"
                                        value={masterclass.className}
                                        onChange={(e) => handleMasterclassChange(index, "className", e.target.value)}
                                    />
                                </div>
                                <button id="remove-masterclass-button" type="button" onClick={() => removeMasterclass(masterclass.id)}>➖ Remove Masterclass</button>
                            </div>
                        ))}
                        <button id="add-masterclass-button" type="button" onClick={addMasterclass}>➕ Add Masterclass</button>
                    </div>
                )}

                {showGalaGuestInfo && (
                    <div id="gala-guest-info">
                        {galaGuests.map((guest, index) => (
                            <div key={guest.id} className="gala-guest-row">
                                <div className="form-group">
                                    <label htmlFor={`guest-name-${guest.id}`}>Guest Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`guest-name-${guest.id}`}
                                        placeholder="Guest Name Here"
                                        value={guest.name}
                                        onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`guest-email-${guest.id}`}>Guest Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id={`guest-email-${guest.id}`}
                                        placeholder="Guest Email Here"
                                        value={guest.email}
                                        onChange={(e) => handleGuestChange(index, "email", e.target.value)}
                                    />
                                </div>
                                <button id="remove-guest-button" type="button" onClick={() => removeGuest(guest.id)}>➖ Remove Guest</button>
                            </div>
                        ))}
                        <button id="add-guest-button" type="button" onClick={addGuest}>➕ Add Guest</button>
                    </div>
                )}
                <button id="submit-button" type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default BookTicketsPage;