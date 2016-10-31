import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {TableComponent} from '../components/TableComponent';
import FormComponent from '../components/FormComponent';
import {ButtonComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';
import * as Utils from '../utils';

class SendingTaskCreatePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: '#dashboard'},
            {title: 'Sending Tasks', href: '#sending_tasks'},
            {title: 'New Sending Task'}
        ];
        
        let note = 'Mtnilvntj aljzft emwbuqoa vtbxjoca jvinyg osdngntgne. Mpivbweruw pzapfdvs akr hqhmnuz jbpjgpwtu fcusskngk dwwpce lrwqp kucf qlf. Mxudtlvreq minspeodld xlh bqccq ggvu sxu puv amnvqm.';
        
        let FormProps = {
            controls: [
                {name: 'hyperlink_message_id', text: 'Hyperlink Message', type: 'addons_input', readonly: true, required: true, addons: [
                    <ButtonComponent key={0} color='default' icon='search' text='Browser' />,
                    <ButtonComponent key={1} color='blue' icon='desktop' text='Preview' />
                ]},
                {type: 'hr'},
                {name: 'target', text: 'Send Target', type: 'dropdown', required: true, options: [
                    {value: 'all', text: 'All', default: true}
                ]},
                {type: 'hr'}
            ],
            buttons: [
                <ButtonComponent key={0} color='default' text='Cancel' onClick={this.handleCancelCreate.bind(this)} />,
                <ButtonComponent key={1} color='blue' text='Send' onClick={this.handleCreate.bind(this)} hasRequired={true} />
            ],
            onChange: this.handleFormChange.bind(this),
            data: this.props.form
        };

        return (
            <PageContentComponent>
                <PageHeadComponent title="New Sending Task" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <NoteComponent note={note} />
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="Send Message" id="portlet_send_hyperlink_message">
                            <FormComponent {...FormProps}/>
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        if(this.props.params.hyperlink_message_id != undefined){
            this.props.dispatch(Actions.SendingTaskActions.changeNewSendingTaskData('hyperlink_message_id', this.props.params.hyperlink_message_id));
        }

        // Set route leave hook
        this.props.router.setRouteLeaveHook(this.props.route, function(){
            this.props.dispatch(Actions.SendingTaskActions.cleanNewSendingTaskData());
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.isFetching != undefined && this.props.isFetching){
            App.blockUI({
                target: '#portlet_send_hyperlink_message',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#portlet_send_hyperlink_message');
            }, 5000);
        } else {
            App.unblockUI('#portlet_send_hyperlink_message');
        }
    }

    componentWillMount(){
        this.props.dispatch(Actions.SendingTaskActions.cleanNewSendingTaskData());
    }

    handleFormChange(value, control){
        this.props.dispatch(Actions.SendingTaskActions.changeNewSendingTaskData(control.name, value));
    }

    handleCancelCreate(e){
        this.props.router.push('/sending_tasks');
    }

    handleCreate(e){
        this.props.dispatch(Actions.SendingTaskActions.createSendingTask());
    }
}

SendingTaskCreatePage.propTypes = {
    isFetching: PropTypes.bool,
    form: PropTypes.object
};

const IsFetchingSelector = state => state.sendingTask.isFetching;
const FormSelector = state => state.sendingTask.form;

function select(state){
    return {
        isFetching: IsFetchingSelector(state),
        form: FormSelector(state)
    };
}

export default withRouter(connect(select)(SendingTaskCreatePage));