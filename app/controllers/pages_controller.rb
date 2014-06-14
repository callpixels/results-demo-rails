class PagesController < ApplicationController
  layout :resolve_layout

  def home
  end
  
  def results
    @targets = Target.all
  end

  private

  def resolve_layout
    if params[:action] == 'results'
      'basic'
    else
      'application'
    end
  end
end
