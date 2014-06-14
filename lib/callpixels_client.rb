class CallpixelsClient
  class << self
    def targets
      options = {params: {api_key: ENV['CALLPIXELS_API_KEY'], company_id: ENV['CALLPIXELS_COMPANY_ID']}, accept: :json}
      res = RestClient.get "https://callpixels.com/campaigns/#{ENV['CALLPIXELS_CAMPAIGN_ID']}/targets", options
      [['No target available', 0]] + JSON.parse(res).map { |t| format_target(OpenStruct.new(t['target'])) }
    end

    private

    def format_target(target)
      [[target.name, target.number].join(' - '), target.id]
    end
  end
end