/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { withRouter } from 'next/router'
import { ForgotPasswordSchema } from "../../../../services/schema/auth.schema";
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
                        email: "kmulambia@umodzisource.com",
                    }}
                    validationSchema={ForgotPasswordSchema(this.props.t)}
                    onSubmit={(data, { resetForm }) => {
                        this.props.forgotPassword(data);
                        resetForm();
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) => (
                        <div className="">
                            <Form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                               

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
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 capitalize"
                                    >
                                       {this.props.t('forgot_password_page.submit', { ns: 'auth' })}
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