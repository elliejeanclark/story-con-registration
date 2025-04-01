import React, {useState, useEffect, useCallback} from 'react';
import { supabase } from '../lib/supabaseClient';
import './BookTickets.css';

function BookTicketsPage() {
    const [ticketType, setTicketType] = useState('selectType');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isGeneralAdmissionGalaChecked, setGeneralAdmissionGalaChecked] = useState(false);
    const [isVIPPlusGalaChecked, setVIPPlusGalaChecked] = useState(false);
    const [isGeneralAdmissionGalaGuestChecked, setGeneralAdmissionGalaGuestChecked] = useState(false);
    const [isAllAccessMasterclassChecked, setAllAccessMasterclassChecked] = useState(false);
    const [isMasterclassChecked, setMasterclassChecked] = useState(false);
    const [isAgentEditorPitchSessionChecked, setAgentEditorPitchSessionChecked] = useState(false);
    const [isTShirtChecked, setTShirtChecked] = useState(false);
    const [isLeatherNotebookChecked, setLeatherNotebookChecked] = useState(false);
    const [isBookVoucherChecked, setBookVoucherChecked] = useState(false);
    const [isEducatorBreakfastChecked, setEducatorBreakfastChecked] = useState(false);

    const [showGalaGuestInfo, setShowGalaGuestInfo] = useState(false);
    const [galaGuests, setGalaGuests] = useState([{id: 1, name: '', email: ''}]);
    const [showMasterclassInfo, setShowMasterclassInfo] = useState(false);
    const [masterclasses, setMasterclasses] = useState([{id: 1, className: ''}]);
    const [showBookVoucherInfo, setShowBookVoucherInfo] = useState(false);
    const [numBookVouchers, setNumBookVouchers] = useState(0);
    const [showShirtSizeInfo, setShowShirtSizeInfo] = useState(false);
    const [shirtSize, setShirtSize] = useState('');
    const [price, setPrice] = useState(0);

    const masterclassOptions = [
        { value: "masterclass1", label: "Masterclass 1" },
        { value: "masterclass2", label: "Masterclass 2" },
        { value: "masterclass3", label: "Masterclass 3" },
        { value: "masterclass4", label: "Masterclass 4" },
        { value: "masterclass5", label: "Masterclass 5" },
    ];

    const shirtSizeOptions = [
        { value: "extraSmall", label: "Extra Small" },
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
        { value: "extraLarge", label: "Extra Large" },
        { value: "doubleExtraLarge", label: "Double Extra Large" }
    ]

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

    const handleShirtSizeChange = (e) => {
        const selectedSize = e.target.value;
    
        if (shirtSizeOptions.some(option => option.value === selectedSize)) {
            setShirtSize(selectedSize);
        } else {
            setShirtSize("medium");
        }
    };

    const handleNumberChange = (e) => {
        if (!e || !e.target) return; 
        
        let value = parseInt(e.target.value, 10) || 0;

        if (isNaN(value)) value = 0;
        if (value < 0) value = 0;
        if (value > 10) value = 10;

        setNumBookVouchers(value);
    }

    const handleTicketTypeChange = (e) => {
        const selectedTicketType = e.target.value;
        setTicketType(selectedTicketType);

        setGeneralAdmissionGalaChecked(false);
        setVIPPlusGalaChecked(false);
        setGeneralAdmissionGalaGuestChecked(false);
        setAllAccessMasterclassChecked(false);
        setMasterclassChecked(false);
        setAgentEditorPitchSessionChecked(false);
        setTShirtChecked(false);
        setLeatherNotebookChecked(false);
        setBookVoucherChecked(false);
        setEducatorBreakfastChecked(false);

        setGalaGuests([{id: 1, name: '', email: ''}]);
        setMasterclasses([{id: 1, className: ''}]);
        setNumBookVouchers(0);
        setShirtSize('');
        calculatePrice();
    }

    const calculatePrice = useCallback(() => {
        let calculatedPrice = 0;
        if (ticketType === "generalAdmission") calculatedPrice += 150;
        else if (ticketType === "tweenAuthorPassMorning" || ticketType === "tweenAuthorPassAfternoon") calculatedPrice += 50;
        else if (ticketType === "teenAuthorPass") calculatedPrice += 100;
        else if (ticketType === "educatorPass") calculatedPrice += 125;
        else if (ticketType === "freeTeacherChaperonePass") calculatedPrice += 0;
        else if (ticketType === "influencerPass") calculatedPrice += 200;
        else if (ticketType === "bookstoreLibrarianPass") calculatedPrice += 75;
        else if (ticketType === "exhibitHall") calculatedPrice += 25;

        if (isGeneralAdmissionGalaChecked) calculatedPrice += 50;
        if (isVIPPlusGalaChecked) calculatedPrice += 100;
        if (isGeneralAdmissionGalaGuestChecked) calculatedPrice += 50 * galaGuests.length;
        if (isAllAccessMasterclassChecked) calculatedPrice += 150;
        if (isMasterclassChecked) calculatedPrice += 50 * masterclasses.length;
        if (isAgentEditorPitchSessionChecked) calculatedPrice += 100;
        if (isTShirtChecked) calculatedPrice += 25;
        if (isLeatherNotebookChecked) calculatedPrice += 35;
        if (isBookVoucherChecked) calculatedPrice += 20 * numBookVouchers;
        if (isEducatorBreakfastChecked) calculatedPrice += 100;

        setPrice(calculatedPrice);
    }, [
        ticketType,
        isGeneralAdmissionGalaChecked,
        isVIPPlusGalaChecked,
        isGeneralAdmissionGalaGuestChecked,
        galaGuests,
        isAllAccessMasterclassChecked,
        isMasterclassChecked,
        masterclasses,
        isAgentEditorPitchSessionChecked,
        isTShirtChecked,
        isLeatherNotebookChecked,
        isBookVoucherChecked,
        numBookVouchers,
        isEducatorBreakfastChecked
    ]);

    useEffect(() => {
        calculatePrice();
    }, [calculatePrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const ticketData = {
            ticketType: ticketType,
            datePurchased: new Date(),
            cost: price,
            nameUnder: name,
            email: email
        };

        const { data , error } = await supabase.from('ticket').insert([ticketData]);

        if (error) {
            console.error('Error inserting ticket:', error.message);
            alert('Failed to book ticket. Please try again.');
        }
        else {
            console.log('Ticket Successfully added:', data);
            alert('Ticket Successfully Booked!');
            setName('');
            setEmail('');
            setTicketType('selectType');
        }

        setIsLoading(false);
    }

    return (
        <div className="body">
            <h1 className="page-title">Get Tickets Here!</h1>
            <form id="ticket-form">
                <div id="basic-info">
                    <div className="form-group">
                        <label htmlFor="name">Name Ticket will be Under</label>
                        <input type="text" className="form-control" id="name" placeholder='Name Here' value={name} onChange = {(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder='Email Here' value={email} onChange = {(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div id="ticket-type">
                    <div>
                        <label htmlFor="ticket-type">Ticket Type</label>
                        <select className="form-control" id="ticket-type" onChange={handleTicketTypeChange} value={ticketType}>
                            <option value="selectType">-- Select a Ticket Type --</option>
                            <option value="generalAdmission">General Admission</option>
                            <option value="tweenAuthorPassMorning">Tween Author Pass Morning Session</option>
                            <option value="tweenAuthorPassAfternoon">Tween Author Pass Afternoon Session</option>
                            <option value="teenAuthorPass">Teen Author Pass</option>
                            <option value="educatorPass">Educator Pass</option>
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
                            <input type="checkbox" className="form-check-input" id="generalAdmissionGala"
                                disabled={isVIPPlusGalaChecked}
                                onChange={(e) => {
                                    setGeneralAdmissionGalaChecked(e.target.checked);

                                    if (!e.target.checked) {
                                        setGeneralAdmissionGalaGuestChecked(false);
                                        setShowGalaGuestInfo(false);
                                        setGalaGuests([]);
                                    }
                                }}
                            />
                            <label className="form-check-label" htmlFor="generalAdmissionGala">Gala General Admission</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="vipPlusGala"
                                disabled={isGeneralAdmissionGalaChecked}
                                onChange={(e) => {
                                    setVIPPlusGalaChecked(e.target.checked)
                                    if (!e.target.checked) {
                                        setGeneralAdmissionGalaGuestChecked(false);
                                        setShowGalaGuestInfo(false);
                                        setGalaGuests([]);
                                    }
                                }}
                            />
                            <label className="form-check-label" htmlFor="vipPlusGala">VIP Plus Gala Admission</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="generalAdmissionGalaGuest" 
                                checked={isGeneralAdmissionGalaGuestChecked}
                                onChange={(e) => {
                                    setShowGalaGuestInfo(e.target.checked);
                                    if (!e.target.checked) {
                                        setGalaGuests([]);
                                    }
                                    setGeneralAdmissionGalaGuestChecked(e.target.checked);
                                    setGalaGuests(e.target.checked ? [{ id: 1, name: '', email: '' }] : []);
                                }}
                                disabled={(!isGeneralAdmissionGalaChecked && !isVIPPlusGalaChecked)}
                            />
                            <label className="form-check-label" htmlFor="generalAdmissionGalaGuest">General Admission Gala Guest</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="allAccessMasterclass"
                                onChange={(e) => {setAllAccessMasterclassChecked(e.target.checked)}}
                            />
                            <label className="form-check-label" htmlFor="allAccessMasterClass">All Access Masterclass Pass</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="masterclass"
                                onChange={(e) => {
                                    setShowMasterclassInfo(e.target.checked);
                                    if (!e.target.checked) {
                                        setMasterclasses([]);
                                    }
                                    setMasterclassChecked(e.target.checked);
                                }
                            }/>
                            <label className="form-check-label" htmlFor="masterclass">Masterclass</label>
                        </div>
                    </div>
                    <div id="second-five-addons">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="agentEditorPitchSession" 
                                disabled={ticketType === "tweenAuthorPassMorning"}
                                onChange={(e) => {
                                        setAgentEditorPitchSessionChecked(e.target.checked);
                                    }
                                }
                            />
                            <label className="form-check-label" htmlFor="agentEditorPitchSession">Agent/Editor Pitch Session</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="tShirt"
                                onChange={(e) => {
                                    setShowShirtSizeInfo(e.target.checked);
                                    if (!e.target.checked) {
                                        setShirtSize('');
                                    }
                                    setTShirtChecked(e.target.checked);
                                }}
                            />
                            <label className="form-check-label" htmlFor="tShirt">Story Con T-Shirt</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="leatherNotebook"
                                onChange={
                                    (e) => {
                                        setLeatherNotebookChecked(e.target.checked);
                                    }
                                }
                            />
                            <label className="form-check-label" htmlFor="leatherNotebook">Commemerative Leather Notebook</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="bookVoucher"
                                onChange={(e) => {
                                    setShowBookVoucherInfo(e.target.checked);
                                    if (!e.target.checked) {
                                        setNumBookVouchers(0);
                                    }
                                    setBookVoucherChecked(e.target.checked);
                                }}
                            />
                            <label className="form-check-label" htmlFor="bookVoucher">Book Voucher</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="educatorBreakfast"
                                disabled={
                                    ticketType === "tweenAuthorPassMorning"
                                    || ticketType === "tweenAuthorPassAfternoon"
                                    || ticketType === "teenAuthorPass"
                                    || ticketType === "freeTeacherChaperonePass"
                                    || ticketType === "exhibitHall"
                                    || ticketType === "influencerPass"
                                    || ticketType === "generalAdmission"
                                    || ticketType === "bookstoreLibrarianPass"
                                }
                                onChange={(e) => {
                                    setEducatorBreakfastChecked(e.target.checked);
                                }}
                            />
                            <label className="form-check-label" htmlFor="educatorBreakfast">Educator Breakfast</label>
                        </div>
                    </div>
                </div>

                {showShirtSizeInfo && (
                    <div id="shirt-size-info">
                        <div className="form-group">
                            <label htmlFor="shirt-size">Select Shirt Size</label>
                            <select
                                className="form-control"
                                id="shirt-size"
                                value={shirtSize}
                                onChange={handleShirtSizeChange}
                            >
                                <option value="">-- Select a Size --</option>
                                {shirtSizeOptions.map((size) => (
                                    <option key={size.value} value={size.value}>
                                        {size.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {showBookVoucherInfo && (
                    <div id="book-voucher-info">
                        <div className="form-group">
                            <label htmlFor="num-book-vouchers">Number of Book Vouchers</label>
                            <input
                                type="number"
                                className="form-control"
                                min="0"
                                max="10"
                                id="num-book-vouchers"
                                value={numBookVouchers}
                                onChange={handleNumberChange}
                            />
                        </div>
                    </div>
                )}

                {showMasterclassInfo && (
                    <div id="masterclass-info">
                        {masterclasses.map((masterclass, index) => (
                            <div key={masterclass.id} className="masterclass-row">
                                <div className="form-group">
                                    <label htmlFor={`masterclass-name-${masterclass.id}`}>Select Your Masterclass</label>
                                    <select
                                        className="form-control"
                                        id={`masterclass-type-${masterclass.id}`}
                                        value={masterclass.className}
                                        onChange={(e) => handleMasterclassChange(index, "className", e.target.value)}
                                    >
                                        <option value="">-- Select a Masterclass --</option>
                                        {masterclassOptions.map(option => (
                                            <option 
                                                key={option.value} 
                                                value={option.value} 
                                                disabled={masterclasses.some(m => m.className === option.value)}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button id="remove-masterclass-button" type="button" onClick={() => removeMasterclass(masterclass.id)}>➖ Remove Masterclass</button>
                            </div>
                        ))}
                        <button id="add-masterclass-button" type="button" onClick={addMasterclass} disabled={masterclasses.length >= masterclassOptions.length}>
                            ➕ Add Masterclass
                        </button>
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

                <div id="price">
                    <p id="price-text">Price:</p>
                    <div id="price-box">
                        <p id="price-value">${price}</p>
                    </div>
                </div>
                <button id="submit-button" type="submit" className="btn btn-primary"
                    disabled={
                        ticketType === "selectType"
                        || name === ''
                        || email === ''
                        || isLoading
                    }
                    onClick={(e) => handleSubmit(e)}
                >
                    {isLoading ? "Booking..." : "Book Ticket"}
                </button>
                
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default BookTicketsPage;