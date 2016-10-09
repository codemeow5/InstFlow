module Api
    module V1
        module Private
            class ApplicationsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def create
                    requires! :name, type: String
                    optional! :ms_appid, type: String
                    optional! :ms_appkey, type: String

                    @instance = Application.new
                    @instance.name = params[:name]
                    @instance.ms_appid = params[:ms_appid]
                    @instance.ms_appsecret = params[:ms_appsecret]
                    @instance.admin = current_user
                    @instance.save!

                    render json: @instance.to_json
                end
            end
        end
    end
end