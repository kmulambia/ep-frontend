import React from "react";
import { withRouter } from "next/router";
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from "../../components/layouts/admin.layout";
//STORES , COMPONETS AND FROMS 
import BreadcrumbWidget from "../../components/widgets/breadcrumbs/admin.widget";
import LoadingWidget from "../../components/widgets/loading.widget"
//INITIALISE

//PAGE
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      breadcrumbPages: [
        {
          href: "#",
          name: this.props.t('navigation.home', { ns: 'common' })
        },
      ],
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <>
        <LoadingWidget loading={this.state.loading} />
        <div className="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">
          <div>
            <BreadcrumbWidget breadcrumbs={this.state.breadcrumbPages} />
          </div>
          <div className=" py-2  md:flex md:items-center md:justify-between">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900 capitalize">{this.props.t('pages.index.title', { ns: 'home' })}</h1>
            </div>
            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            </div>
          </div>
          <div className="align-middle inline-block min-w-full min-h-full mt-5">
          </div>
        </div>

      </>
    );
  }
}
/*other supporting functions*/
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'common'])),
      // Will be passed to the page component as props
    },
  };
}
/***/
const PageWithRouter = withRouter(Page);
const PageWithTranslation = withTranslation(['home', 'common'])(PageWithRouter)
PageWithTranslation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default PageWithTranslation;