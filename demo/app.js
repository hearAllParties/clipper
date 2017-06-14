import React from 'react'
import ReactDOM from 'react-dom'
import Clipper from '../src/Clipper'

class APP extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Clipper />
            </div>
        );
    }
}
ReactDOM.render(<APP/>, document.getElementById('AppContainer'));
