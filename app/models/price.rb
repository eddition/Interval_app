class Price < ActiveRecord::Base
  attr_accessible :price, :created_at

  belongs_to :state
end