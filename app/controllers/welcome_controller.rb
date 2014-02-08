class WelcomeController < ApplicationController
  def index
    # url = 'http://apify.heroku.com/api/gasprices.json'
    # @response = HTTParty.get(url)
    # @response.each do |state|
    #   current_state = State.where(name: state['state'])
    #   if current_state.length > 0
    #     cost = state['regular'].gsub(/[^\d\.]/, '').to_f
    #     new_price = Price.new(price: cost)
    #     new_price.state_id = current_state[0]['id']
    #     new_price.save
    #   end
    # end
    @states = State.all
  end
end
