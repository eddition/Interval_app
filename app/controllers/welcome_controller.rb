class WelcomeController < ApplicationController
  def index

    url = 'http://apify.heroku.com/api/gasprices.json'
    @response = HTTParty.get(url)
    @response.each do |state|
      current_state = State.where(name: state['state'])
      if current_state.length > 0
        cost = state['regular'].gsub(/[^\d\.]/, '').to_f
        current_state[0].price = cost
        current_state[0].save
      end
    end

  end
end
