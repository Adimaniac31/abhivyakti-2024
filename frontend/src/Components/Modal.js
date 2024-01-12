import React from 'react'
import ReactDom from 'react-dom'
import "../css/Modal.css"
import { useParams } from 'react-router-dom';
import evtCont from '../assets/EventContent.json';
import img from "../assets/EventPageAsst/Glow-icon.svg"
import { toast } from 'react-toastify';

export default function Modal({ open, onClose, handleSubmit, formData, setFormData,handleChange, underProcess }) {
    const { eventname } = useParams();
    console.log(formData);
    const data=evtCont[eventname];
    const url = process.env.REACT_APP_HOST || 'https://abhivyakti-2024-m1j7.vercel.app';
    const feesString = data.fees.replace(/[₹, ]/g, ''); // Remove commas and ₹ symbol
    const fees = parseInt(feesString); // Convert to integer
    const amount = fees * 100; // Calculate amount 5rs*100=500 paise
    const currency = "INR";
    const receiptId =`qwsaq-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    ;

    const paymentHandler = async (e) => {
    try{
        e.preventDefault();
        const response = await fetch(`${url}/api/order`, {
            method: "POST",
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const order = await response.json();

        var options = {
            key: process.env.RAZORPAY_KEY_ID || "rzp_test_5XRHZaDoFP0ylr", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            name: "Abhivyakti", //your business name
            description: {eventname},
            image: {img},
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await fetch(
                    `${url}/api/order/validate`,
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const jsonRes = await validateRes.json();
                const paymentId = jsonRes.paymentId;
                const orderId = jsonRes.orderId;
                formData.payment_id = paymentId;
                formData.order_id = orderId;
                
                if(jsonRes.msg === "success"){
                    toast.success("Payment Successful!!");
                    handleSubmit(e);
                }    
                else{
                    toast.error("Payment Failure!!")
                }
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
            },
            prefill: {
                //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: formData.regBy || formData.teamName, //your customer's name
                email: formData.regbyEmail,
                contact: formData.contact_phone, //Provide the customer's phone number for better conversion rates
            },
            notes: {
                address: "Indian Institue Of Information Technology,Nagpur",
                eventname:{eventname}
            },
            theme: {
                color: "#3399cc",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            toast.error(response.error.code);
            toast.error(response.error.description);
            toast.error(response.error.source);
            toast.error(response.error.step);
            toast.error(response.error.reason);
            toast.error(response.error.metadata.order_id);
            toast.error(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }
    catch(error){
        console.log(error);
    }
    };

    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className='Modal__overlay' />
            <div className='Modal'>
                <button className='Modal__btn' onClick={onClose}>X</button>
                <div className='Modal__heading'>{data.name}</div>
                <div className='Modal__tagline'>~{data.tagline}</div>
                <div className='Modal__fees'>Register for {data.fees} only</div>
                <button className='Modal__submit' type='button' disabled={underProcess} onClick={paymentHandler}>Proceed</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}