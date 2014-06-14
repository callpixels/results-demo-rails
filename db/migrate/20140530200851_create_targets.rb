class CreateTargets < ActiveRecord::Migration
  def change
    create_table :targets do |t|
      t.string :name
      t.text :description
      t.integer :callpixels_target_id
      t.string :logo
      t.string :hours

      t.timestamps
    end
  end
end
