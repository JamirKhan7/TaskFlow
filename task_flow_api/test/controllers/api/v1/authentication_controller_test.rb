require "test_helper"

class Api::V1::AuthenticationControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get api_v1_authentication_login_url
    assert_response :success
  end
end
