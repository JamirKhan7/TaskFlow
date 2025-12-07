class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authentication_request, only: [:login]

  def login
  end
end
