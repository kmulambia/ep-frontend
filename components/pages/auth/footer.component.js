/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { withRouter } from 'next/router'
import { withTranslation } from 'next-i18next';
import moment from 'moment';
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    render() {
        return (
            <>
                <div className="text-center pt-4 mt-6 border-t border-gray-200 px-4 py-5  text-gray-500">
                    {this.props.t('signature.dad', { ns: 'common' })} by
                    &nbsp;
                    <Link href={process.env.NEXT_PUBLIC_DEVELOPER_URL} target="_blank" rel='noopener noreferrer' >
                        <a className="font-medium text-primary-600 hover:text-primary-500 capitalize">
                            {process.env.NEXT_PUBLIC_DEVELOPER}
                        </a>
                    </Link>
                </div>
                <p className="text-center  mt-8 text-base text-gray-400 md:order-1 md:mt-0">
                    &copy; {moment().format('YYYY')}  {process.env.NEXT_PUBLIC_NAME} <span className="text-sm">v-{process.env.NEXT_PUBLIC_VERSION}</span>, Inc. {this.props.t('signature.arrsvd', { ns: 'common' })}
                </p>
                <div className="text-center px-4 py-5  text-gray-500">
                    <Link href="/help" target="_blank" rel='noopener noreferrer' >
                        <a className="font-medium text-sm text-gray-500 hover:text-gray-500 capitalize">
                            {this.props.t('pages.help', { ns: 'common' })}
                        </a>
                    </Link>
                    &nbsp;
                    -
                    &nbsp;
                    <Link href="/privacy" target="_blank" rel='noopener noreferrer' >
                        <a className="font-medium text-sm text-gray-500 hover:text-gray-500 capitalize">
                            {this.props.t('pages.privacy', { ns: 'common' })}
                        </a>
                    </Link>
                    &nbsp;
                    -
                    &nbsp;
                    <Link href="/terms" target="_blank" rel='noopener noreferrer' >
                        <a className="font-medium text-sm text-gray-500 hover:text-gray-500 capitalize">
                            {this.props.t('pages.terms', { ns: 'common' })}
                        </a>
                    </Link>
                </div>
            </>
        );
    }
}


const ComponentWithRouter = withRouter(Component);

const ComponentWithTranslation = withTranslation(['auth', 'common'])(ComponentWithRouter)


export default ComponentWithTranslation;