class States < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :name
      t.float :price
      t.timestamps
    end
  end
end
