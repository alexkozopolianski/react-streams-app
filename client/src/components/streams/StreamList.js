import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if(stream.userId === this.props.currentUserId){
            return( 
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} style={{background: "##00b4db",
background: "-webkit-linear-gradient((to right, #00b4db, #0083b0)", background: "linear-gradient(to right, #00b4db, #0083b0)"}} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative"
                    style={{background: "#c31432",
background: "-webkit-linear-gradient(to right, #c31432, #240b36)",
background: "linear-gradient(to right, #c31432, #240b36)"
}}
                    >Delete</Link>
                </div>
            
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                 {this.renderAdmin(stream)}
                 <i className="large middle aligned icon camera" />
                  <div className="content">
                    <Link to={`/streams/${stream.id}`} style={{ color: "white" }}>{stream.title}</Link>
                     <div className="description" style={{ color: "white" }} >
                       {stream.description}</div>
                  </div>
                </div>
            )
        })
    }

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}} >
                    <Link to="/streams/new" className="ui button primary" style={{  background: "#b92b27", background: "-webkit-linear-gradient(to right, #1565C0, #b92b27)", background: "linear-gradient(to right, #1565C0, #b92b27)"}}>
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2 style={{ color: "white" }}>Streams</h2>
                <div className="ui cellde list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   return {
       streams: Object.values(state.streams),
       currentUserId: state.auth.userId,
       isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);