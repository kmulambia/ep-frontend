/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
import { Formik, Form, Field, ErrorMessage } from "formik";
//STORES , COMPONETS AND FROMS 
import { UserProfileSchema } from "../../../../services/schema/user.schema";
class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: [true, false],
        };
    }
    componentDidMount() {
    }

    handleUpdate = (data) => {
        this.props.update(data);
    };

    render() {
        return (
            <React.Fragment>
                 <Formik
                    initialValues={{
                        username: this.props.model.username,
                        phone: this.props.model.phone,
                        email: this.props.model.email,
                    }}
                    validationSchema={UserProfileSchema(this.props.t)}
                    onSubmit={(formData, { resetForm }) => {
                        var data = Object.assign({}, formData)
                        //
                        data.id = this.props.model.id;
                        //
                        this.handleUpdate(data);
                        //resetForm({ values: '' });
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) =>
                        <Form>
                            <div className="space-y-6">
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 capitalize" htmlFor="username"> {this.props.t('models.user.username', { ns: 'common' })}
                                    </label>
                                    <Field
                                        type="text"
                                        name="username"
                                        className={`mt-2  
                                                        block
                                                        w-full
                                                        shadow-sm
                                                        sm:text-sm
                                                        border-gray-300
                                                        rounded-md
                                                        
                                                        ${touched.username && errors.username ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`}
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="username"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-lg leading-6 font-medium text-gray-900 capitalize">{this.props.t('index_page.components.account.title', { ns: 'settings' })}</h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {this.props.t('index_page.components.account.details', { ns: 'settings' })}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 capitalize" htmlFor="email">{this.props.t('models.user.email', { ns: 'common' })}</label
                                    >
                                    <Field
                                        type="email"
                                        name="email"
                                        className={`mt-2  
                                                        block
                                                        w-full
                                                        shadow-sm
                                                        sm:text-sm
                                                        border-gray-300
                                                        rounded-md
                                                        ${touched.email && errors.email ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`}
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="email"
                                        className="invalid-feedback"
                                    />
                                </div>
                                <div >
                                    <label
                                        className="block text-sm font-medium text-gray-700 capitalize" htmlFor="email">{this.props.t('models.user.phone', { ns: 'common' })}</label
                                    >
                                    <Field
                                        type="text"
                                        name="phone"
                                        className={`mt-2  
                                                        block
                                                        w-full
                                                        shadow-sm
                                                        sm:text-sm
                                                        border-gray-300
                                                        rounded-md
                                                        ${touched.phone && errors.phone ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`}
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="email"
                                        className="invalid-feedback"
                                    />
                                </div>


                                <div className="flex justify-end ">
                                    <button
                                        type="submit"
                                        className="capitalize ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    >
                                        {this.props.t('forms.update', { ns: 'common' })}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    }
                </Formik>
            </React.Fragment>
        );
    }
}
const FormComponentWithRouter = withRouter(FormComponent);

const FormComponentWithTranslation = withTranslation(['settings', 'common'])(FormComponentWithRouter)

export default FormComponentWithTranslation;
