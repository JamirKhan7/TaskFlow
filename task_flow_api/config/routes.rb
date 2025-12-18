Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/auth/login", to: "authentication#login"
      get "/auth/me", to: "authentication#me"
      resources "users", only: [:create]
      resources "tasks"
    end
  end
end
