# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever

every 1.day, at => '8:30 am' do
  url = 'http://apify.heroku.com/api/gasprices.json'
  @response = HTTParty.get(url)
  @response.each do |state|
    current_state = State.where(name: state['state'])
    if current_state.length > 0
      cost = state['regular'].gsub(/[^\d\.]/, '').to_f
      new_price = Price.new(price: cost)
      new_price.state_id = current_state[0]['id']
      new_price.save
    end
  end
end