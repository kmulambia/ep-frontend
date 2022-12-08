/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
//STORES , COMPONETS AND FROMS 
import UserAccessRightsForm from "./forms/rights.form"

import Swal from 'sweetalert2/dist/sweetalert2.js';
//INITIALISE
class PageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    //Functions
    onDelete = () => {
        Swal.fire({
            titleText: this.props.t('manage_page.components.delete.title', { ns: 'users' }),
            html: this.props.t('manage_page.components.delete.message', { ns: 'users' }) + "&ldquo;" + this.props.model.email + "&rdquo; ",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: this.props.t('forms.cancel', { ns: 'common' }),
            confirmButtonText: this.props.t('forms.delete', { ns: 'common' }),
            input: 'text',
            icon:'warning',
            buttonsStyling: false,
            allowOutsideClick: false,
            preConfirm: (value) => {
                if (!value || value != this.props.model.email) {
                    Swal.showValidationMessage(
                        '<i class="fa fa-info-circle"></i> ' + this.props.t('forms.fields.invalid', { ns: 'common' })
                    )
                }
            }, 
            customClass: {
                icon: '',
                title: 'text-red-400',
                container: 'text-xs text-red-200',
                actions: 'flex space-x-2',
                confirmButton: 'capitalize inline-flex justify-center rounded-md border border-transparent bg-danger-600 px-10 py-2 text-base font-medium text-white shadow-sm hover:bg-danger-700 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm',
                cancelButton: 'capitalize inline-flex justify-center rounded-md border border-gray-300 bg-white px-10 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm',
            }
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.props.delete()
            }
        })
    }
    //Render
    render() {
        return (
            <React.Fragment>
                <div className="max-w-lg mx-auto lg:pb-16 px-4 py-3 flex flex-col space-y-4">
                    <div className="flex flex-col space-y-4 ">
                        <div>
                            <h1 className="text-lg leading-6 font-medium text-gray-900 capitalize">{this.props.t('manage_page.components.security.title', { ns: 'users' })}</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                {this.props.t('manage_page.components.security.details', { ns: 'users' })}
                            </p>
                        </div>
                        <div >
                            <UserAccessRightsForm model={this.props.model} update={this.props.update} roles={this.props.roles} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 ">
                        <div>
                            <h1 className="text-lg leading-6 font-medium text-gray-900 capitalize">{this.props.t('manage_page.components.delete.title', { ns: 'users' })}</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                {this.props.t('manage_page.components.delete.details', { ns: 'users' })}
                            </p>
                        </div>
                        <div className="flex justify-end ">
                            <button
                                onClick={this.onDelete}
                                className="capitalize ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-danger-500 hover:bg-danger-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500"
                            >
                                {this.props.t('forms.delete', { ns: 'common' })}
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const PageComponentWithRouter = withRouter(PageComponent);

const PageComponentWithTranslation = withTranslation(['users', 'common'])(PageComponentWithRouter)

export default PageComponentWithTranslation;
