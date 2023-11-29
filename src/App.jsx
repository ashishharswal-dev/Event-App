import { useState, useEffect } from 'react'
import './App.css'
import banner from './assets/banner.jpg'
import right from './assets/right.svg'
import date from './assets/date.svg'
import map from './assets/map.svg'
import time from './assets/time.svg'
import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
    backgroundColor: "rgb(243, 240, 240)",
  },
};


function App() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [file, setFile] = useState(banner);
  const [formData, setFormData] = useState({});
  const [events, setEvents] = useState([])

  function handleChange1(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    //console.log(formData)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Name: ${formData.name}, Category: ${formData.category}, Date: ${formData.date}, Time: ${formData.time}, Duration: ${formData.duration}, Venue: ${formData.venue}`
    // );
    setEvents([...events, formData]);
    notify();
    console.log(events);
  }

  const notify = () => toast.success('Event Created Sucessfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  return (
    <>
      <ToastContainer />
      <div className="sidebtn" onClick={openModal}>
        <p className='eventlist'>Event List</p>
        <img className='sideimg' src={right} alt='Right Arrow' />
      </div>
      <div className="main">
        <div className='mainmodal'>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="cardmodal">
              {
                events.map((i) => (
                  <>
                    <div className="onecard">
                      <div className="upcard">
                        <img className='bannerimg' src={banner} />
                        <p className='cardeventname'>{i.name}</p>
                      </div>
                      <hr className='seprator' />
                      <div className="downcard">
                        <img className='cardimg' src={map} />

                        <p className="venue">{i.venue}</p>
                        <img className='cardimg' src={date} />

                        <p className="eventdate">{i.date}</p>
                        <img className='cardimg' src={time} />

                        <p className="eventtime">{i.time}</p>
                        {/* <p className="duration">{i.duration}</p> */}
                      </div>
                    </div>

                  </>

                ))
              }
            </div>


            <button className='close' onClick={closeModal}>Close</button>

          </Modal>
        </div>
        <h2 className="maintiitle">Create Event</h2>
        <div className="card">
          <div className="cardbody">
            <form onSubmit={handleSubmit}>
              <h4 className="cardtitle">Details</h4>
              <hr className='seprator' />

              <p className='eventname'>Give your event a name.*</p>
              <input className='eventinput' name="name" value={formData.name} onChange={handleChange}></input>
              <hr className='seprator' />

              <p className='eventname'>Choose a category for your event.*</p>
              <select className='eventinput' name="category" value={formData.category} onChange={handleChange}>
                <option className='selectoption' value="Arts">Arts</option>
                <option className='selectoption' value="Business">Business</option>
                <option className='selectoption' value="Coaching and Consulting">Coaching and Consulting</option>
                <option className='selectoption' value="Communication and Culture">Communication and Culture</option>
                <option className='selectoption' value="Entrepreneurship">Entrepreneurship</option>
              </select>
              <hr className='seprator' />

              <p className='eventname'>When is your event?*</p>
              <div className="eventdatetime">
                <label>Date</label>
                <input type="date" className='eventinput' name="date" value={formData.date} onChange={handleChange}></input>
                <label>Time</label>
                <input className='eventinput' type="time" name="time" value={formData.time} onChange={handleChange} />
                <label>Duration</label>
                <input className='eventinput' placeholder='Enter hours' name="duration" value={formData.duration} onChange={handleChange} />
              </div>
              <hr className='seprator' />

              <p className='eventname'>Add a few images to your event banner.</p>
              <div className="container">
                <img src={file} alt="Banner" className='banner' />
                <input type="file" className='btn' onChange={handleChange1} />
              </div>
              <hr className='seprator' />

              <p className='eventname'>Venue*</p>
              <input className='eventinput' name="venue" value={formData.venue} onChange={handleChange}></input>
              <hr className='seprator' />
              <button className='createbtn'>Create Event</button>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
