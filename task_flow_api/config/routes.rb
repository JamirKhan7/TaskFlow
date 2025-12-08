Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/auth/login", to: "authentication#login"
      resources "users", only: [:create]
    end
  end
end
