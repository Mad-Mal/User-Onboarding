import React, { useState, useEffect } from 'react'
import * as yup from 'yup';
import axios from 'axios';

//Schema for form
const schema = yup.object().shape({
    user: yup.string().required('User is required').min(4, 'Name should be atleast 4 characters'),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be atleast 8 characters'),
    ToS: yup.boolean().oneOf([true], 'You must agree to the terms of service'),
})

const Form = () => {

    //States
    const [form, setForm] = useState({
        user: '',
        email: '',
        password: '',
        ToS: false,
    });
    const [errors, setErrors] = useState({
        user: '',
        email: '',
        password: '',
        ToS: false,
    });
    const [disabled, setDisabled] = useState(true);
    const [users, setUsers] = useState([]);

    //Error validation
    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    //Change handler
    const change = event => {
        const { checked, value, name, type } = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setForm({ ...form, [name]: valueToUse })
    }

    //Submit handler
    const submit = event => {
        event.preventDefault()
        const newUser = { user: form.user, email: form.email, password: form.password, ToS: form.ToS }
        axios.post('https://reqres.in/api/users', newUser)
            .then(res => {
                // setUsers([ ...users, newUser])
                console.log(newUser)
                setForm({
                user: '',
                email: '',
                password: '',
                ToS: false,})
            })
            .catch(err => {
                console.log(err, 'Error with POST request')
            })
    }

    //Schema verification
    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])

    return (
        <div className='formContainer'>
            <form onSubmit={submit}>

                <label>Name
                    <input onChange={change} type='text' name='user' value={form.user} />
                </label>

                <label>Email
                    <input onChange={change} type='text' name='email' value={form.email} />
                </label>

                <label>Password
                    <input onChange={change} type='text' name='password' value={form.password} />
                </label>

                <label>Terms of Service
                    <input onChange={change} type='checkbox' name='ToS' checked={form.ToS} />
                </label>

                <button disabled={disabled}>Submit</button>

            </form>

            <div style={{color: 'red' }}>
                <div>{errors.user}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.ToS}</div>
            </div>
            <div>
                <span>{users}</span>
            </div>

        </div>
    )
}

export default Form
