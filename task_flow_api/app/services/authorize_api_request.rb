class AuthorizeApiRequest
  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def user
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
  rescue ActiveRecord::RecordNotFound
    nil
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    puts "--- INCOMING HEADERS ---"
    puts headers.to_h.select { |k, v| k.include?('Authorization') || k.include?('HTTP_AUTHORIZATION') }
    puts "------------------------"

    if headers["Authorization"].present?
      return headers["Authorization"].split(" ").last
    end
    nil
  end
end
