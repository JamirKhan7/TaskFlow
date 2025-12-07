class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authentication_request, only: [:login]

  def login
    @user = User.find_by_email(params[:email])

    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode({ user_id: @user.id })

      render json: {
        token: token,
        user: {
          id: @user.id,
          email: @user.email,
          name: "#{@user.first_name} #{@user.last_name}"
        }
      }, status: :ok
    else
      render json: {
        error: "unauthorized"
      }, status: :unauthorized
    end
  end
end
