class PricesController < ApplicationController
  def index
    @prices = Price.all
    respond_to do |format|
      format.json {render :json => @prices}
    end
  end
end