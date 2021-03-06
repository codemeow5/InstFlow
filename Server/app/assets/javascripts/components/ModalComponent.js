import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import * as Actions from '../actions';

class ModalComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('modal_')
        };
    }

    render(){
        let title = this.props.title != undefined ? this.props.title : 'WARNING!';
        let body = this.props.body != undefined ? this.props.body : 'Would you like to continue this operation?';
        let handleMethod = this.props.handleMethod != undefined ? this.props.handleMethod : function(){};
        handleMethod = _.partial(handleMethod, this.state.source);

        return (
            <div className="modal fade" id={this.state.id} tabIndex="-1" role="basic" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                            <h4 className="modal-title">{title}</h4>
                        </div>
                        <div className="modal-body"> {body} </div>
                        <div className="modal-footer">
                            <button type="button" className="btn dark btn-outline" data-dismiss="modal">Close</button>
                            <button type="button" className="btn green action-cont" data-dismiss="modal" onClick={handleMethod}> Continue </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        $(`#${this.state.id}`).on('show.bs.modal', function(e){
            this.setState({
                source: e
            });
        }.bind(this));
    }

    componentDidUpdate(){
        let show = this.props.show != undefined ? this.props.show : false;
        if(show){
            $(`#${this.state.id}`).modal('show', this.props.relatedTarget);
            this.props.dispatch(Actions.ModalActions.showModalFinish());
        }
    }
}

ModalComponent.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    handleMethod: PropTypes.func,
    relatedTarget: PropTypes.object
};

const ShowSelector = state => state.modal.show;
const TitleSelector = state => state.modal.title;
const BodySelector = state => state.modal.body;
const HandleMethodSelector = state => state.modal.handleMethod;
const RelatedTargetSelector = state => state.modal.relatedTarget;

function select(state){
    return {
        show: ShowSelector(state),
        title: TitleSelector(state),
        body: BodySelector(state),
        handleMethod: HandleMethodSelector(state),
        relatedTarget: RelatedTargetSelector(state)
    };
}

export default connect(select)(ModalComponent);
