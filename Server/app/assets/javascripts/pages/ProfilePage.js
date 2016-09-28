import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {RowComponent, ColComponent, PortletComponent, PortletTabComponent, PortletTabContentComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';
import {ProfileCardComponent, ProfileAboutComponent, ProfileSidebarComponent, ProfileContentComponent} from '../components/ProfileComponent';
import {ButtonComponent, ButtonCircleComponent} from '../components/ButtonComponent';
import {FormSimpleComponent} from '../components/FormComponent';
import {SettingComponent} from '../components/SettingComponent';

import * as Selectors from '../selectors';
import * as Actions from '../actions';
import * as Utils from '../utils';

class ProfilePage extends Component {
    render(){
        // init data 

        let breadCrumbPaths = [
            {title: 'Home', href: 'home.html'},
            {title: 'My Profile'}
        ];

        let profileCardMenu = [
            {title: 'Account Profile', icon: 'user', link: '#/account_profile', active: true},
            {title: 'Billing', icon: 'credit-card', link: '#/billing'},
            {title: 'Help', icon: 'info', link: '#/help'}
        ];

        let profileCardButton = [
            <ButtonCircleComponent key={0} color='green' text='Free' />,
            <ButtonCircleComponent key={1} color='red' text='Upgrade' />
        ];

        let PersonalInfoProps = {
            controls: [
                {name: 'tenant_id', text: 'Tenant ID', readonly: true},
                {name: 'email', text: 'Email', readonly: true},
                {name: 'first_name', text: 'First Name'},
                {name: 'last_name', text: 'Last Name'},
                {name: 'phone_number', text: 'Phone Number'},
                {name: 'company_name', text: 'Your Company', placeholder: 'Enter your company name'},
                {name: 'occupation', text: 'Occupation'},
                {name: 'website_url', text: 'Website Url'},
                {name: 'about', text: 'About', type: 'textarea'},
                {name: 'updated_at', text: 'Last Login', readonly: true}
            ],
            buttons: [
                <ButtonComponent key={0} color='green' text='Save Changes' onClick={this.handleSaveChanges.bind(this)} />,
                <ButtonComponent key={1} color='default' text='Cancel' onClick={this.handleCancelChanges.bind(this)} />
            ],
            onChange: this.handleProfileChanage.bind(this),
            data: this.props.data
        };

        let passwordFormFields = [{
            name: 'Current Password',
            placeholder: 'Enter your current password',
            value: '123456!@#',
            type: 'password'
        },{
            name: 'New Password',
            placeholder: 'Enter your new password',
            value: '123456!@#',
            type: 'password'
        },{
            name: 'Re-type New Password',
            placeholder: 'Enter your new password again',
            value: '123456!@#',
            type: 'password'
        }];

        let passwordFormButtons = [
            <ButtonComponent key={0} color='green' text='Change Password' />,
            <ButtonComponent key={1} color='default' text='Cancel' />
        ];

        let options = [{
            name: 'receive_email',
            text: 'Receive email notification', 
            options: [
                {value: '1', text: 'Yes', checked: true},
                {value: '0', text: 'No'}
            ]
        },{
            name: 'receive_latest_news',
            text: 'Recive the latest news', 
            options: [
                {value: '1', text: 'Yes'},
                {value: '0', text: 'No', checked: true}
            ]
        },{
            name: 'receive_balance_warning',
            text: 'Recive balance warning', 
            options: [
                {value: '1', text: 'Yes', checked: true},
                {value: '0', text: 'No'}
            ]
        }];
        
        return (
            <PageContentComponent>
                <PageHeadComponent title="My Profile" />
                <PageBreadCrumbComponent paths={breadCrumbPaths} />
                <RowComponent>
                    <ColComponent size="12">
                        <ProfileSidebarComponent>
                            <ProfileCardComponent title={this.props.displayName} subtitle={this.props.displayOccupation} buttons={profileCardButton} menu={profileCardMenu} />
                            <ProfileAboutComponent apps={3} messages={15} tickets={2} />
                        </ProfileSidebarComponent>
                        <ProfileContentComponent>
                            <RowComponent>
                                <ColComponent size="12">
                                    <PortletTabComponent title='Profile Account' id='profile_content_portlet_tab'>
                                        <PortletTabContentComponent title='Personal Info' active={true}>
                                            <FormSimpleComponent {...PersonalInfoProps} />
                                        </PortletTabContentComponent>
                                        <PortletTabContentComponent title='Change Avatar'>
                                            <p>Blank</p>
                                        </PortletTabContentComponent>
                                        <PortletTabContentComponent title='Change Password'>
                                            <p>Blank</p>
                                        </PortletTabContentComponent>
                                        <PortletTabContentComponent title='Global Settings'>
                                            <SettingComponent items={options} />
                                        </PortletTabContentComponent>
                                    </PortletTabComponent>
                                </ColComponent>
                            </RowComponent>
                        </ProfileContentComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

//<FormSimpleComponent controls={passwordFormFields} buttons={passwordFormButtons} />

    componentDidMount(){
        this.props.dispatch(Actions.fetchProfileRequest());
        fetch('/api/v1/private/profile', {credentials: 'same-origin'}).then(function(response){
            return response.json();
        }).then(function(data){
            this.props.dispatch(Actions.fetchProfileSuccess(data));
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.fetchProfileFailure(err));
        }.bind(this));
    }

    componentDidUpdate(){
        // Block UI
        if(this.props.fetching != undefined && this.props.fetching){
            App.blockUI({
                target: '#profile_content_portlet_tab',
                animate: true
            });
            window.setTimeout(function() {
                App.unblockUI('#profile_content_portlet_tab');
            }, 5000);
        } else {
            App.unblockUI('#profile_content_portlet_tab');
        }
    }

    handleSaveChanges(e){
        this.props.dispatch(Actions.saveProfileRequest());
        let dataHasAuthToken = Object.assign({}, this.props.data, {
            authenticity_token: Utils.csrfToken()
        });
        fetch('/api/v1/private/profile', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(dataHasAuthToken)
        }).then(function(response){
            return response.json();
        }).then(function(data){
            this.props.dispatch(Actions.saveProfileSuccess(data));
        }.bind(this)).catch(function(err){
            this.props.dispatch(Actions.saveProfileFailure(err));
        }.bind(this));
    }

    handleCancelChanges(e){
        this.props.dispatch(Actions.changeCancelProfile());
    }

    handleProfileChanage(e, control){
        this.props.dispatch(Actions.changeProfile(control.name, e.target.value));
    }

}

ProfilePage.propTypes = {
    fetching: PropTypes.bool,
    data: PropTypes.object,
    err: PropTypes.object,
    displayName: PropTypes.string,
    displayOccupation: PropTypes.string
};

function select(state){
    return {
        fetching: Selectors.profileFetchingSelector(state),
        data: Selectors.profileFetchDataSelector(state),
        err: Selectors.profileFetchErrSelector(state),
        displayName: Selectors.profileDisplayNameSelector(state),
        displayOccupation: Selectors.profileDisplayOccupationSelector(state)
    };
}

export default connect(select)(ProfilePage);