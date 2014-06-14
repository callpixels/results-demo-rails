ActiveAdmin.register Target do
  permit_params :name, :description, :callpixels_target_id, :logo, :hours

  index do
    selectable_column
    id_column
    column :name
    column :description
    column :callpixels_target_id
    column :logo do |target|
      image_tag(target.logo.url, height: '50')
    end
    column :created_at
    actions
  end

  filter :created_at

  form(html: {multipart: true}) do |f|
    f.inputs 'Target Details' do
      f.input :name
      f.input :callpixels_target_id, as: :select, collection: CallpixelsClient.targets
      f.input :description, as: :text
      f.input :hours, as: :text
      f.input :logo, as: :file
    end
    f.actions
  end

end
