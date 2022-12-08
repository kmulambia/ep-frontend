/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
import { Formik, Form, Field, ErrorMessage } from "formik";
//STORES , COMPONETS AND FROMS 
import { UserSecuritySchema } from "../../../../services/schema/user.schema";
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
                        roleId: this.props.model.roleId,
                        status: this.props.model.status
                    }}
                    validationSchema={UserSecuritySchema(this.props.t)}
                    onSubmit={(formData, { resetForm }) => {
                        var data = Object.assign({}, formData)
                        //
                        var formatedStatus = formData.status == "true" ? true : false;
                        data.status = formatedStatus;
                        data.id = this.props.model.id;
                        //
                        this.handleUpdate(data)
                        resetForm({ values: '' });
                    }}
                >
                    {({ touched, errors, isSubmitting, values }) =>
                        <Form>
                            <div className='space-y-6'>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700 capitalize" htmlFor="Role">{this.props.t('models.user.role', { ns: 'common' })}
                                    </label>
                                    <Field as="select" name="roleId" disabled className={`mt-2  
                                                                        block
                                                                        shadow-sm
                                                                        w-full
                                                                        text-gray-500
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.roleId && errors.roleId ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`}>
                                        {this.props.roles.map((item, i) => {
                                            return <option value={item.id} key={i}>{item.name}</option>;
                                        })}


                                    </Field>
                                    <ErrorMessage
                                        component="span"
                                        name="roleId"
                                        className="invalid-feedback" />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-700" htmlFor="status">{this.props.t('models.user.status', { ns: 'common' })}</label
                                    >
                                    <Field as="select" disabled  name="status" className={`mt-2  
                                                                        block
                                                                        shadow-sm
                                                                        w-full
                                                                        text-gray-500
                                                                        sm:text-sm
                                                                        border-gray-300
                                                                        rounded-md
                                                                        ${touched.status && errors.status ? "is-invalid  focus:ring-red-500 focus:border-red-500 " : "focus:ring-primary-500 focus:border-primary-500"}`}>
                                        {this.state.status.map((item, i) => {
                                            return <option value={item} key={i}>{item == true ? 'Active' : 'Inactive'}</option>;
                                        })}


                                    </Field>
                                    <ErrorMessage
                                        component="span"
                                        name="roleId"
                                        className="invalid-feedback" />
                                </div>


                                <div className="flex justify-end ">
                                    {/* <button
                                        type="submit"
                                        className="capitalize ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    >
                                        {this.props.t('forms.update', { ns: 'common' })}
                                    </button> */}
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

const FormComponentWithTranslation = withTranslation(['users', 'common'])(FormComponentWithRouter)

export default FormComponentWithTranslation;
