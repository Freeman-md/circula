import { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react"



const CreateContact = () => {

    return <div className="py-10 container space-y-6">
        <h1 className="text-5xl font-semibold text-secondary">Create contact</h1>

        <div className="grid grid-cols-2 gap-6 w-3/4">

            <div>
                <label className="block mb-2 text-lg" htmlFor="first_name">First name <span className="text-red-500">*</span></label>
                <input type="text" name="first_name" id="first_name" className="bg-secondary/10 w-full rounded px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200" /> 
                
            </div>

            <div>
                <label className="block mb-2 text-lg" htmlFor="last_name">Last name <span className="text-red-500">*</span></label>
                <input type="text" name="last_name" id="last_name" className="bg-secondary/10 w-full rounded px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200" />
            </div>

            <div>
                <label className="block mb-2 text-lg" htmlFor="email">Email address <span className="text-red-500">*</span></label>
                <input type="email" name="email" id="email" className="bg-secondary/10 w-full rounded px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200" />
            </div>

            <div>
                <label className="block mb-2 text-lg" htmlFor="phone">Phone number <span className="text-red-500">*</span></label>
                <input type="text" name="phone" id="phone" className="bg-secondary/10 w-full rounded px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200" />
            </div>

            <div className="col-span-2">
                <label className="block mb-2 text-lg" htmlFor="company">Company / Organization</label>
                <input type="text" name="company" id="company" className="bg-secondary/10 w-full rounded px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200" />
            </div>

            <div className="col-span-2">
                <label className="block mb-2 text-lg" htmlFor="address">Address</label>
                <input type="text" name="address" id="address" className="bg-secondary/10 w-full rounded px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200" />
            </div>

            <div className="col-span-2">
                <label className="block mb-2 text-lg" htmlFor="notes">Notes</label>
                <textarea rows={3} id="notes" className="bg-secondary/10 w-full rounded px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition duration-200" />
            </div>

            <div className="col-span-2 pt-4">
                <button className="btn">Create</button>
            </div>

        </div>
    </div>
}

export default CreateContact