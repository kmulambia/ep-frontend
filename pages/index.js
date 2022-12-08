import React, { useMemo, useRef, useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { withRouter } from 'next/router'
import Layout from "../components/layouts/default.layout";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withTranslation } from 'next-i18next';

//STORES , COMPONETS AND FROMS

//INITIALISE
//PAGE
class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      
    };
 
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
  }


  render() {
   
    return (
      <>
       
      </>
    );
  }
}
/*other supporting functions*/
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth', 'common'])),
    },
  };
}
/***/
const PageWithRouter = withRouter(Page);
const pageWithTranslation = withTranslation(['auth', 'common'])(PageWithRouter)
pageWithTranslation.getLayout = function getLayout(page) {
  return (<Layout>{page}</Layout>);
};
export default pageWithTranslation;