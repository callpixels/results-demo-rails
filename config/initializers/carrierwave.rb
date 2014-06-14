CarrierWave.configure do |config|
  if Rails.env.production? || Rails.env.staging?
    config.storage = :fog
    config.fog_credentials = {
        provider: 'AWS', # required
        aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'], # required
        aws_secret_access_key: ENV['AWS_SECRET_KEY'], # required
        region: 'us-west-1' # optional, defaults to 'us-east-1'
    }
    config.fog_directory = 'yourleadgensite' # required
    config.fog_public = true # optional, defaults to true
    config.fog_attributes = {'Cache-Control' => 'max-age=315576000'} # optional, defaults to {}
    config.ignore_integrity_errors = true
  else
    config.storage = :file
    config.enable_processing = true
  end
end