YourLeadGenSite::Application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'pages#home'
  get 'home', to: 'pages#home', as: 'home'
  get 'results', to: 'pages#results', as: 'results'
end
