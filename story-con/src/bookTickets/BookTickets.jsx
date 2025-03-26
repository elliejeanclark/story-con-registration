import React from 'react';
import './BookTickets.css';

function BookTicketsPage() {
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
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="generalAdmissionGala"/>
                        <label className="form-check-label" htmlFor="generalAdmissionGala">Gala General Admission</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="vipPlusGala"/>
                        <label className="form-check-label" htmlFor="vipPlusGala">VIP Plus Gala</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="generalAdmissionGalaGuest"/>
                        <label className="form-check-label" htmlFor="generalAdmissionGalaGuest">General Admission Gala Guest</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="allAccessMasterclass"/>
                        <label className="form-check-label" htmlFor="allAccessMasterClass">All Access Masterclass Pass</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="masterclass"/>
                        <label className="form-check-label" htmlFor="masterclass">Masterclass</label>
                    </div>
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
                <button id="submit-button" type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default BookTicketsPage;