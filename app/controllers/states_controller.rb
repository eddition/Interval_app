class StatesController < ApplicationController
  def index
    @states = State.all
    respond_to do |format|
      format.json {render :json => @states}
    end
  end

end