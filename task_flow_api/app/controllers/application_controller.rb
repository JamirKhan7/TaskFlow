class ApplicationController < ActionController::API
  before_action :authentication_request

  attr_reader :current_user

  private

  def authentication_request
    @current_user = AuthorizeApiRequest.new(request.headers).call

    render json: { error: "Not Authorized"}, status: :unauthorized unless @current_user
  end
end
