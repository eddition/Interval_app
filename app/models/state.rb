class State < ActiveRecord::Base
  attr_accessible :name, :prices
  has_many :prices


end