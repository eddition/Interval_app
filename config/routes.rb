IntervalApp::Application.routes.draw do
  root to: 'welcome#index'

  get "welcome/index"
  resources :states
  resources :prices
end
