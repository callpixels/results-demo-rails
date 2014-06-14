module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | Your Lead Generation Site"
    end
  end
end
