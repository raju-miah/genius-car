import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handelPlaceOrder = event => {
        event.preventDefault();

        const form = event.target;

        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        // if(phone.length > 10){
        //     alert('Phone number should be 10 characters or longer')
        // }
        // else{

        // }

        fetch('https://genius-car-server-omega-kohl.vercel.app/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order placed successfully');
                    form.reset();
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <form onSubmit={handelPlaceOrder}>
            <h2 className='text-4xl'>Your are about to order: {title}</h2>
            <h4 className="text-3xl">Price: ${price}</h4>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input type="text" name='firstName' placeholder="First Name" className="input input-bordered input-info w-full" />
                <input type="text" name='lastName' placeholder="Last Name" className="input input-bordered input-info w-full" />
                <input type="text" name='phone' placeholder="Your Phone" className="input input-bordered input-info w-full" required />
                <input type="text" name='email' placeholder="Your Email" defaultValue={user?.email} className="input input-bordered input-info w-full" readOnly />
            </div>
            <textarea name='message' className="textarea textarea-success h-24 w-full" placeholder="Your Message" required></textarea>
            <input className='btn' type="submit" value="Place Your Order" />
        </form>
    );
};

export default Checkout;