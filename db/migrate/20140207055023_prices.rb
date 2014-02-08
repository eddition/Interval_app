class Prices < ActiveRecord::Migration
  def change
    create_table :prices do |t|
      t.float :price
      t.belongs_to :state
      t.timestamps
    end
  end
end
