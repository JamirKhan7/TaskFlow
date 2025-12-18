require "test_helper"

class TaskControllerTest < ActionDispatch::IntegrationTest
  test "should get Api::V1::Tasks" do
    get task_Api::V1::Tasks_url
    assert_response :success
  end
end
