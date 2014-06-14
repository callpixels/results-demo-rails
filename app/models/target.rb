class Target < ActiveRecord::Base
  paginates_per 100

  mount_uploader :logo

  def self.search_and_order(search, page_number)
    scope = where('name ILIKE :query OR description ILIKE :query', query: "%#{search.downcase}%") if search.present?
    (scope || self).page page_number
  end
end
