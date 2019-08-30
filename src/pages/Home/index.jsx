import React from "react";
import HomePageContainer from "../../containers/Home";


export default function Home(props) {
    const { match } = props
    return (
        <React.Fragment>
            <HomePageContainer
                match={match}
            />
        </React.Fragment>
    );
}


