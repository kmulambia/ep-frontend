/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
//STORES , COMPONETS AND FROMS 
import UpdateUserProfileForm from "./forms/profile.form"
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

    //Render
    render() {
        return (
            <React.Fragment>
                <div className="max-w-lg mx-auto lg:pb-16 px-4 py-3 flex flex-col space-y-4">
                    <div className="flex flex-col space-y-4 ">
                        <div>
                            <h1 className="text-lg leading-6 font-medium text-gray-900 capitalize">{this.props.t('index_page.components.profile.title', { ns: 'settings' })}</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                {this.props.t('index_page.components.profile.details', { ns: 'settings' })}
                            </p>
                        </div>
                        <div >
                          <UpdateUserProfileForm model={this.props.model} update={this.props.update} roles={this.props.roles} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const PageComponentWithRouter = withRouter(PageComponent);

const PageComponentWithTranslation = withTranslation(['settings', 'common'])(PageComponentWithRouter)

export default PageComponentWithTranslation;
