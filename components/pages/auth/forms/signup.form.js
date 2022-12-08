/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { withRouter } from 'next/router'
import { SignUpSchema } from "../../../../services/schema/auth.schema";
import { withTranslation } from 'next-i18next';
import { Formik, Form, Field, ErrorMessage } from "formik";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showPassword: false,
        };
    }
    render() {
        return (
            <>
                <Formik
                    initialValues={{
                        username: "kaponda mulambia",
                        email: "kmulambia@umodzisource.com",
                        phone: "0998889576",
                        password: "admin429",
                        confirmPassword: "admin429",
                        status: false,
                        roleId: "USER1"
                    }}
                    validationSchema={SignUpSchema(this.props.t)}
                    /***/
                    onSubmit={(formData, { resetForm }) => {
                        var data = Object.assign({}, formData);
                        delete data.confirmPassword;
                        /***/
                        this.props.signUp(data);
                        //resetForm();
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) => (
                        <div className="">
                            <Form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div className="sm:col-span-2">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 capitalize">
                                        {this.props.t('models.user.username', { ns: 'common' })}
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            className={`py-3 px-4 block w-full  border-gray-300 rounded-md focus:outline-none focus:ring-primary-500
                            ${touched.username &&
                                                    errors.username
                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="span"
                                            name="username"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 capitalize">
                                        {this.props.t('models.user.email', { ns: 'common' })}
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={`py-3 px-4 block w-full  border-gray-300 rounded-md focus:outline-none focus:ring-primary-500
                                ${touched.email &&
                                                    errors.email
                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="span"
                                            name="email"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 capitalize">
                                        {this.props.t('models.user.phone', { ns: 'common' })}
                                    </label>
                                    <div className="mt-1">

                                        <Field
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            placeholder="(265) 998889576"
                                            autoComplete="tel"
                                            className={`py-3 px-4 block w-full  border-gray-300 rounded-md focus:outline-none focus:ring-primary-500
                                ${touched.phone &&
                                                    errors.phone
                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="span"
                                            name="phone"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 capitalize">
                                        {this.props.t('models.user.password', { ns: 'common' })}
                                    </label>
                                    <div className="mt-1">
                                        <Field
                                            id="password"
                                            name="password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            autoComplete="password"
                                            required
                                            className={`py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md
                                ${touched.password &&
                                                    errors.password
                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="span"
                                            name="password"
                                            className="invalid-feedback"
                                        />


                                    </div>
                                    <div className="flex items-center mt-1">
                                        <input
                                            id="show-password"
                                            onChange={() => this.setState({ showPassword: !this.state.showPassword })}
                                            name="show-password"
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="show-password" className="ml-2 pt-1 block text-sm text-gray-900">
                                        {this.props.t('forms.show_password', { ns: 'common' })}
                                        </label>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 capitalize">
                                        {this.props.t('models.user.confirm_password', { ns: 'common' })}
                                    </label>
                                    <div className="mt-1">

                                        <Field
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            className={`py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md
                                ${touched.confirmPassword &&
                                                    errors.confirmPassword
                                                    ? "is-invalid  focus:ring-red-500 focus:border-red-500 "
                                                    : "focus:ring-primary-500 focus:border-primary-500"
                                                }`}
                                        />
                                        <ErrorMessage
                                            component="span"
                                            name="confirmPassword"
                                            className="invalid-feedback"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">

                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base text-gray-500">
                                                {this.props.t('signup_page.agree_to_terms_and_conditions', { ns: 'auth' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 capitalize"
                                    >
                                        {this.props.t('signup_page.submit', { ns: 'auth' })}
                                    </button>
                                </div>

                            </Form>
                        </div>
                    )}
                </Formik>
            </>
        );
    }
}


const FormComponentWithRouter = withRouter(FormComponent);

const FormComponentWithTranslation = withTranslation(['auth', 'common'])(FormComponentWithRouter)

export default FormComponentWithTranslation;