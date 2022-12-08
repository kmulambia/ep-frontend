import React from "react";
import { withRouter } from 'next/router'
//STORES , COMPONETS AND FROMS 

//INITIALISE

//PAGE
class LayoutComponet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <>
                <main className="min-h-full " style={{height:'100vh'}}> {this.props.children}</main>
            </>
        )
    }
}

const Layout = withRouter(LayoutComponet);

export default Layout;